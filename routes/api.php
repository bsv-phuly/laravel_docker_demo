<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1', 'namespace' => '\\App\\Api\\V1\\Controllers', 'as' => 'api.'], function () {
    Route::get('broad-cast-message', 'BroadcastController@callBroadcast');
    Route::post('send-broad-cast-message', 'BroadcastController@sendBroadcastMessage');
    Route::get('/blogs/{id}', 'BroadcastController@index');
    Route::post('/blogs/update/{id}', 'BroadcastController@update');
    Route::get('/blogs', 'BroadcastController@list');
    Route::post('/blogs/create', 'BroadcastController@create');
});

Route::fallback(function (Request $request) {
    return response()->json(
        [
            "result" => [
                'code' => __('code.route_not_found'),
                'message' => __('validation.system_err')
                ]
        ],
        400);
});
