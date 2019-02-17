<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\Events\NewMessage;

class MessageController extends Controller
{
    public function index()
    {
       $message=new Message();
       $message->body=request('text');
       $message->save();
       event(new NewMessage($message));
    }
}
