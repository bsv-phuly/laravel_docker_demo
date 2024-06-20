<?php

namespace App\Api\V1\Controllers;

use App\Events\BroadcaseEventChanged as EventsBroadcaseEventChanged;
use App\Events\BroadcastEvent;
use App\Models\Blog;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class BroadcastController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function callBroadcast()
    {
        return event(new BroadcastEvent('hello world'));
    }

    public function sendBroadcastMessage(Request $request)
    {
        try {
            return event(new BroadcastEvent($request->message));
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function list()
    {

        $blog = Blog::get('*');
        if (isset($blog)) {
            return response()->json([
                'status_code' => 201,
                'message' => 'SUCCESS',
                'data' => $blog,
            ]);
        } else {
            return response()->json([
                'status_code' => 405,
                'message' => 'error',
                'data' => [],
            ]);
        }
    }
    public function index($id)
    {

        try {
            $cachedBlog = Redis::get('blog_' . $id);
            if (isset($cachedBlog)) {
                $blog = json_decode($cachedBlog, FALSE);

                return response()->json([
                    'status_code' => 201,
                    'message' => 'Fetched from redis',
                    'data' => $blog,
                ]);
            } else {
                $blog = Blog::find($id);
                Redis::set('blog_' . $id, $blog);

                return response()->json([
                    'status_code' => 201,
                    'message' => 'Fetched from database',
                    'data' => $blog,
                ]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status_code' => $th->getCode(),
                'message' => $th->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {

        $update = Blog::findOrFail($id)->update($request->all());

        if ($update) {

            // Delete blog_$id from Redis
            Redis::del('blog_' . $id);

            $blog = Blog::find($id);
            // Set a new key with the blog id
            Redis::set('blog_' . $id, $blog);

            return response()->json([
                'status_code' => 201,
                'message' => 'User updated',
                'data' => $blog,
            ]);
        }
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $data['title'] = $request->title;
            $data['sub_header'] = $request->sub_header;
            $data['content'] = $request->content;
            Blog::create($data);
            DB::commit();
            return response()->json([
                'status_code' => 200,
                'message' => 'Create successfully',
                'data' => [],
            ]);
        } catch (\Throwable $th) {
            dd($th);
            DB::rollBack();
            return response()->json([
                'status_code' => $th->getCode(),
                'message' => $th->getMessage(),
                'data' => [],
            ]);
        }
    }
}
