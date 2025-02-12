import Worker from '../worker?worker&inline'

export default defineContentScript({
  matches: ['https://*/*'],
  main() {
    new Worker()
  }
});
