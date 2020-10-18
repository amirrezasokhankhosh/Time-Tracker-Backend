<template>
    <div class="page">
        <v-card class="login-card">
            <h2 class="card-title">{{ $t('signup.TITLE') }}</h2>
            <v-text-field
                class="card-field"
                v-model="userName"
                :label="$t('signup.USER_NAME')"
                color="primary"
            ></v-text-field>
            <v-text-field
                class="card-field"
                v-model="email"
                :rules="[rules.required, rules.email]"
                :label="$t('signup.EMAIL')"
                color="primary"
            ></v-text-field>
            <v-text-field
                class="card-field"
                color="primary"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                :label="$t('signup.PASSWORD')"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>
            <p style="text-align: center; margin-bottom: 0">
                <v-btn
                    class="ma-2 login-button"
                    :loading="loading4"
                    :disabled="loading4"
                    color="primary"
                    @click="loader = 'loading4'"
                >
                    {{ $t('signup.TITLE') }}
                    <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                    </template>
                </v-btn>
            </p>
            <router-link to="/" style="text-decoration: none"><p class="question mt-3">{{ $t('signup.HAVE_ACCOUNT') }}</p></router-link>
            <login-locale-changer />
        </v-card>
    </div>
</template>

<script>
    import LoginLocaleChanger from './core/LoginLocaleChanger'

    export default {
        components: {
            LoginLocaleChanger
        },
        data () {
            return {
                title: 'Preliminary report',
                email: '',
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
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            },
        },
    }
</script>

<style scoped>
    .page{
        width: 100%;
        height: 100vh;
        background-image: url("http://www.hdwallpaperspulse.com/wp-content/uploads/2017/03/06/black-simple-background-hd.jpg");
    }

    @media screen and (max-width: 500px) {
        .page{
            width: 100%;
            height: 100vh;
        }
        .login-card{
            margin: 2rem auto !important;
            width: 60vh !important;
            height: 75vh;
        }
    }
    .login-card{
        margin: 5rem auto;
        width: 60vh;
        height: auto;
        padding-bottom: 30px;
    }
    .card-title{
        padding-top: 2rem;
        text-align: center;
        font-weight: bolder;
    }
    .card-field{
        margin-top: 10px !important;
        width: 70%;
        margin: 0 auto;
    }
    .checkbox-card{
        margin-left: 3.5rem;
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
    .login-button{
        margin-top: 4rem!important;
    }
    .question{
        text-align: center;
        color: rgb(79,195,247);
        margin: 0;
    }
</style>
