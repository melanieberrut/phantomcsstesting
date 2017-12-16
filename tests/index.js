/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );


casper.test.begin( 'Bootstrap basic project visual testings', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/screenshots/failures' ),
		addLabelToFailedImage: false,
		mismatchTolerance: 0.05,
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	
	var viewports = [
		{
			'name': 'desktop',
			'viewport': {width:1024, height: 768}
		},
		{
			'name': 'tablet',
			'viewport': {width:768, height: 1024}
		},
		{
			'name': 'mobile',
			'viewport': {width:320, height: 568}
		}
	]

	/*
		The test scenario
	*/

	casper.start( 'http://localhost:8080' );

	
	casper.each(viewports, function(casper, viewport){
		this.then(function(){
			this.viewport( viewport.viewport.width, viewport.viewport.height );
			phantomcss.screenshot('.navbar.navbar-inverse', 'navbar.navbar-inverse--'+ viewport.name);
			phantomcss.screenshot('.jumbotron > .container', 'jumbotron--'+ viewport.name);
			phantomcss.screenshot('.jumbotron > .container', 'jumbotron--'+ viewport.name);
			phantomcss.screenshot('.block.block--one', 'block.block--one--'+ viewport.name);
			phantomcss.screenshot('.block.block--two', 'block.block--two--'+ viewport.name);
			phantomcss.screenshot('.block.block--three', 'block.block--three--'+ viewport.name);
			phantomcss.screenshot('footer', 'footer--'+ viewport.name);
		});
	});
	

	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );

	/*
	Casper runs tests
	*/
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
