<!DOCTYPE html>
<html>
<head>
    <title>{{config('app.name')}}</title>
    
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="{{URL::asset('js/app.js')}}" type="text/javascript" ></script>
	<link href="{{URL::asset('css/app.css')}}" rel="stylesheet">

</head>

<body class='container-fluid'>

 <!--Ad Space-->	
 <div class="col-sm-2">
        
 </div>

 <div class="col-sm-8" >
    @yield('content')
 </div>
 
 <!--Ad Space-->
 <div class="col-sm-2" >
        
 </div>
</body>

@yield('script')

</html>