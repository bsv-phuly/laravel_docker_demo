<?php

namespace App\Listeners;

use App\Events\BroadcastEvent;

class BroadcastListener
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\BroadcastEvent  $event
     * @return void
     */
    public function handle(BroadcastEvent $event)
    {
        return $event->message;
    }
}
