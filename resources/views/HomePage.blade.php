@extends('layout')

@section('content')
<div id='welcomeBlock'>
<h1>Welcome To {{config('app.name')}}</h1>
<h1>Meet Intresting People</h1>
  <button id="entryButton"><a href="/Chat" style="text-decoration:none; color:black;">Start Chatting</a></button>
</div>
@endsection