<template>
  <div id="app">
    <Typographist >
      <TSwitch :display="isDevelopment ? 'flex': 'none'"/>
      <TDebugger>
        <App/>
      </TDebugger>
    </Typographist>
  </div>
</template>

<script>
import { Typographist, TSwitch, TDebugger } from 'typographist-vue-devtools';
import App from './components/App';

export default {
  name: 'Root',
  data: () => ({ isDevelopment: process.env.NODE_ENV === 'development' }),
  components: {
    Typographist,
    TSwitch,
    TDebugger,
    App,
  },
};
</script>
