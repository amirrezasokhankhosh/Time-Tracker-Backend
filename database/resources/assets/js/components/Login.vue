<template>
  <div class="page">
    <v-card class="login-card">
      <h2 class="card-title">{{ $t('login.TITLE') }}</h2>
      <v-text-field
        class="card-field"
        v-model="email"
        :rules="[rules.required, rules.email]"
        :value="value"
        :label="$t('login.EMAIL')"
        color="primary"
      ></v-text-field>
      <v-text-field
        class="card-field"
        v-model="password"
        color="primary"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :value="value"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        :label="$t('login.PASSWORD')"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-checkbox
        small-chips
        class="checkbox-card"
        :label="$t('login.REMEMBER_PASSWORD')"
        color="primary"
        hide-details
      ></v-checkbox>
      <!--<p class="forget-password" to="" @click="">Forget Password ?</p>-->
      <p style="text-align: center; margin-bottom: 0">
        <v-btn
          class="ma-2 login-button"
          :loading="loading4"
          :disabled="loading4"
          color="primary"
          @click="submit()"
        >
          {{ $t('login.TITLE') }}
          <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light>cached</v-icon>
                            </span>
          </template>
        </v-btn>
      </p>
      <p
        style="text-align: center;cursor: pointer; margin-top: 5px"
        color="primary"
        dark
        @click.stop="dialog = true"
      >
        {{ $t('login.FORGOT_PASSWORD') }}
      </p>


      <v-dialog
        v-model="dialog"
        max-width="320"
      >
        <v-card>
          <v-card-title class="headline"> {{ $t('login.FORGOT_PASSWORD') }}</v-card-title>
          <v-text-field
            class="card-field"
            v-model="email"
            :rules="[rules.required, rules.email]"
            :label="$t('login.EMAIL')"
            color="primary"
          ></v-text-field>
          <v-card-text style="text-align: center">{{ $t('login.SEND_EMAIL') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <p style="text-align: center">
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                {{ $t('login.SEND') }}
              </v-btn>
            </p>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <router-link to="/signup" style="text-decoration: none">
        <p class="question">
          {{ $t('login.DONT_HAVE-ACCOUNT') }}
        </p>
      </router-link>
      <login-locale-changer/>
    </v-card>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import LoginLocaleChanger from './core/LoginLocaleChanger'

  export default {
    components: {
      LoginLocaleChanger
    },
    data() {
      return {
        title: 'Preliminary report',
        email: '',
        password: '',
        value: '',
        dialog: false,
        show1: false,
        loader: null,
        loading4: false,
        rules: {
          min: value => value.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },
    methods: {
      ...mapActions(['userLogin']),
      async submit() {
        await this.userLogin({
          email: this.email,
          password: this.password
        })
      }
    },
    watch: {
      loader() {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>

<style scoped>
  .page {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("http://www.hdwallpaperspulse.com/wp-content/uploads/2017/03/06/black-simple-background-hd.jpg");
  }

  @media screen and (max-width: 500px) {
    .page {
      width: 100%;
      height: 100vh;
    }

    .login-card {
      margin: 2rem auto !important;
      width: 60vh !important;
      height: 75vh;
    }
  }

  .login-card {
    margin: 5rem auto;
    width: 60vh;
    height: auto;
    padding-bottom: 20px;
  }

  .card-title {
    padding-top: 2rem;
    text-align: center;
    font-weight: bolder;
  }

  .card-field {
    width: 70%;
    margin: 10px auto 0;
  }

  .checkbox-card {
    margin-left: 3.5rem;
    margin-right: 3.5rem;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .login-button {
    margin-top: 5rem !important;
  }

  .question {
    text-align: center;
    color: rgb(79, 195, 247);
    margin: 0;
  }

  .forget-password {
    margin-left: 3.7rem;
    margin-top: 5px;
  }
</style>
