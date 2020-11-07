<template>
  <div class="flex min-h-screen bg-white">
    <div
      class="relative flex flex-col justify-center flex-1 order-last w-3/5 px-4 py-12 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-64"
    >
      <svg
        class="absolute transform translate-x-1/2 top-full right-full -translate-y-1/4 xl:-translate-y-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        role="img"
        aria-labelledby="svg-workcation"
      >
        <title id="svg-workcation">Workcation</title>
        <defs>
          <pattern
            id="ad119f34-7694-4c31-947f-5c9d249b21f3"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
      </svg>
      <div class="w-full max-w-lg mx-auto">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold leading-9 text-gray-900">
            Iniciar sesión
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <ValidationObserver ref="form" tag="form" autocomplete="off" @submit.prevent="onSubmit">
              <ValidationProvider
                v-slot="{ errors }"
                vid="email"
                name="correo electrónico"
                tag="div"
                rules="required|email"
              >
                <input-group
                  id="signin-email"
                  v-model="form.email"
                  label="Correo electrónico"
                  name="email"
                  :error="errors[0]"
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                vid="password"
                name="contraseña"
                tag="div"
                rules="required|min:6"
              >
                <input-group
                  id="signin-password"
                  v-model="form.password"
                  type="password"
                  name="password"
                  label="Contraseña"
                  :error="errors[0]"
                />
              </ValidationProvider>

              <div class="flex items-center justify-between mt-6">
                <div class="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-checkbox"
                  >
                  <label
                    for="remember_me"
                    class="block ml-2 text-sm leading-5 text-gray-900"
                  >Recordarme</label>
                </div>

                <div class="text-sm leading-5">
                  <nuxt-link
                    to="/reset"
                    class="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </nuxt-link>
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <custom-button
                    type="submit"
                    title="Ingresar"
                    class="w-full py-3 text-lg"
                    :loading="isLoading"
                  />
                </span>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex-1 hidden w-0 bg-gray-100 lg:block">
      <div class="w-full h-screen bg-blue-600">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SignInPage extends Vue {
  isLoading = false
  form = {
    email: '',
    password: '',
  }

  layout() {
    return 'auth';
  }

  async onSubmit() {
    this.isLoading = true;
    await (this.$refs.form as any).validate();
    try {
      // eslint-disable-next-line no-empty
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
