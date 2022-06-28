import { refs } from './refs.js';
export function lockBodyScroll() {
    if (refs.body.classList.contains('modal-open')) {
        return refs.body.classList.remove('modal-open');
    }
    if (!refs.body.classList.contains('modal-open')) {
        return refs.body.classList.add('modal-open');
    }
}