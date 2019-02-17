@extends('layout')

@section('content')

<div class="chatBox">
	<div class='chatLog'>
	  <div class="thierChatMessage">
	        <b>Them</b>
			<p>Helloo There</p>
		</div>
	</div>
  <div class="chatInput">
	<button id='send'>Send</button>
	<input type='text' id='text' placeholder="Text Here">
  </div>
</div>
@endsection

@section('script')
<script src="{{URL::asset('js/chat.js')}}" type="text/javascript"></script>
@endsection