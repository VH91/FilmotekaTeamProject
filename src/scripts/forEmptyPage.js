import { refs } from './refs.js';
import { load, save, remove } from '../scripts/localStorageApi.js';

const forEmptyPage = (keyName) => {
    let isEmpty = load(keyName);
    refs.mainSection.classList.remove('openLibrary');
    if (!isEmpty || isEmpty.length === 0) {
        return refs.mainSection.classList.add('openLibrary');
    }
}
export default forEmptyPage;