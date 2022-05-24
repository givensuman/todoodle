import '../../style.css'
import Alpine from 'alpinejs'
// @ts-ignore
window.Alpine = Alpine
queueMicrotask(() => {
    Alpine.start()
});