<template lang='pug'>
  h2 this is login page
</template>

<script>
import marked from '../../tools/marked';

const left = marked(`

## Gekko

Gekko is a Bitcoin trading bot and backtesting platform that
connects to popular Bitcoin exchanges. It is written in javascript
and runs on nodejs.

[Find out more](https://gekko.wizb.it/).

*Gekko is 100% free (open source), if you paid for this you have been scammed.*

`);

export default {
  data: () => {
    return {
      left,
    };
  },
};
</script>
