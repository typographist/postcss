<template>
    <div id="app">
        <template v-if="visible">
            <Typographist>
                <TSwitch />
                <TDebugger>
                    <Home/>
                </TDebugger>
            </Typographist>
        </template>
        <template  v-else>
            <Home />
        </template>
  </div>
</template>

<script>
import { Typographist, TSwitch, TDebugger } from 'typographist-vue-devtools';
import Home from './components/Home';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export default {
  name: 'App',
  data: () => ({ visible: IS_DEVELOPMENT }),
  components: {
    Typographist,
    TSwitch,
    TDebugger,
    Home,
  },
};
</script>
