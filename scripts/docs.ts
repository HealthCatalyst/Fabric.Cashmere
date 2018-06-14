import {Dgeni} from 'dgeni';
import {apiDocsPackage} from '../tools/dgeni';

const dgeni = new Dgeni([apiDocsPackage]);
dgeni.generate().then(docs => {
    console.log(docs.length, 'docs generated');
});
