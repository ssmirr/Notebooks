
require('yargs')
  .usage('$0 <cmd> [args]')
  .command('area [type]', "calc area", (yargs) => 
  {
    yargs.positional('type', {
      type: 'string',
      default: 'rect',
      describe: 'The type of shape to calculate area.'
    })
    .option("w", {
      describe: "The width of the area.",
      type: "number"
    })
    .option("h", {
      describe: "The height of the area.",
      type: "number"
    })
  }, function (argv) { calc(argv) } )
  .help()
  .argv

	function calc(argv) {
  // Unpack into variables
  let {w,h,r,type} = argv;

  if( type == "rect") {
    console.log( `Area: ${w * h}`);
  }
}
