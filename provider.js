const { importCost, cleanup, Lang } = require('import-cost');

const baseDir = process.argv[2];
const modules = JSON.parse(process.argv[3]);

const fileContents = modules
  .filter(Boolean)
  .map((m, i) => `import * as var${i} from '${m}'`)
  .join('\n');

const emitter = importCost(`${baseDir}/test.js`, fileContents, Lang.JAVASCRIPT);
emitter.on('error', process.stdout.write);
emitter.on('done', packages => {
  process.stdout.write(JSON.stringify(packages));
  emitter.removeAllListeners();
  cleanup();
});
