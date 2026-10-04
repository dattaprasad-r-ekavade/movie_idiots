import path from 'node:path';
import {config} from 'dotenv';
import {ROOT} from './paths';
config({path:path.join(ROOT,'.env'),quiet:true});
