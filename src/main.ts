import { mount } from 'svelte'
import App from './App.svelte'
const className = ".groupLine.totalPrice";

// const target = document.getElementById('app')!
const app = mount(App, { target:document.body })
export default app;

