<template>
  <v-container fluid>
    <v-layout row wrap>
      <!--<Heading :title="$t('myProfile.TITLE')" />-->
      <v-flex xs12 sm8 offset-sm2>
        <v-dialog v-model="dialog" max-width="400px">
          <template>
            <v-flex text-xs-center>
              <v-btn
                small
                text

                @click="triggerChangePassword = true"
                class="btnChangePassword"
              >{{ $t('myProfile.CHANGE_MY_PASSWORD') }}</v-btn
              >
            </v-flex>
          </template>
          <v-card>
            <form @submit.prevent="save">
              <v-card-title>
                <span class="headline">
                  {{ $t('myProfile.CHANGE_MY_PASSWORD') }}
                </span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <template v-if="triggerChangePassword">
                      <v-col cols="12">
                        <v-text-field
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          :label="$t('myProfile.CURRENT_PASSWORD')"
                          v-model="oldPassword"
                          :data-vv-as="$t('myProfile.CURRENT_PASSWORD')"
                          :error="errors.has('oldPassword')"
                          :error-messages="errors.collect('oldPassword')"
                          v-validate.disable="'required|min:5'"
                          key="oldPassword"
                          autocomplete="off"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          :label="$t('myProfile.NEW_PASSWORD')"
                          v-model="newPassword"
                          :data-vv-as="$t('myProfile.NEW_PASSWORD')"
                          :error="errors.has('newPassword')"
                          :error-messages="errors.collect('newPassword')"
                          v-validate.disable="'required|min:5'"
                          key="newPassword"
                          ref="password"
                          autocomplete="off"
                        ></v-text-field>
                      </v-col>
                      <v-flex xs12>
                        <v-text-field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          :label="$t('myProfile.CONFIRM_NEW_PASSWORD')"
                          v-model="confirmPassword"
                          :data-vv-as="$t('myProfile.NEW_PASSWORD')"
                          :error="errors.has('confirmPassword')"
                          :error-messages="errors.collect('confirmPassword')"
                          v-validate.disable="
                            'required|min:5|confirmed:password'
                          "
                          key="confirmPassword"
                          autocomplete="off"
                        ></v-text-field>
                      </v-flex>
                    </template>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten3" text @click="close">
                  {{ $t('dataTable.CANCEL') }}
                </v-btn>
                <SubmitButton
                  :text="$t('dataTable.SAVE')"
                  color="yellow lighten3"
                  text
                />
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>

        <!--profile photo started here-->
        <v-row style="margin-top: 3rem;">
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <div align="center" style="margin-top: 50px">
              <img
                style="width: 15rem; height: 15rem; border-radius: 110px;"
                src="https://randomuser.me/api/portraits/men/15.jpg"
              />
              <h3 style="font-size: 30px; font-weight: 200;">Steve Adams</h3>
            </div>
          </v-col>

          <!--profile photo ended here-->

          <!--Profile card started here-->
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-card
              style="border-radius: 10px; width: 100%; margin: 0 auto; height: auto;"
            >
              <v-row>
                <v-col cols="12" style="display: flex; justify-content: center; align-items: center">
                  <v-card-title>{{ $t('myProfile.EDIT_PROFILE') }}</v-card-title>
                </v-col>
              </v-row>
              <form  @submit.prevent="submit">
                <v-container grid-list-md>
                  <v-row wrap>
                    <v-col xs12 md12>
                      <v-text-field
                        outlined
                        id="email"
                        name="email"
                        type="email"
                        :label="$t('myProfile.EMAIL')"
                        v-model="email"
                        :data-vv-as="$t('myProfile.EMAIL')"
                        :error="errors.has('email')"
                        :error-messages="errors.collect('email')"
                        v-validate.disable="'required|email'"
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs12 md12>
                      <v-text-field
                        outlined
                        class="profile-item"
                        id="name"
                        name="name"
                        type="text"
                        :label="$t('myProfile.NAME')"
                        v-model="name"
                        :data-vv-as="$t('myProfile.NAME')"
                        :error="errors.has('name')"
                        :error-messages="errors.collect('name')"
                        v-validate.disable="'required'"
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" xs12 md12>
                      <v-text-field
                        outlined
                        class="profile-item"
                        id="phone"
                        name="phone"
                        type="tel"
                        :label="$t('myProfile.PHONE')"
                        v-model="phone"
                        :data-vv-as="$t('myProfile.PHONE')"
                        :error="errors.has('phone')"
                        :error-messages="errors.collect('phone')"
                        v-validate.disable="'required'"
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" text-xs-center mt-2 style="text-align: center">
                      <SubmitButton
                        class="profile-btn"
                        :text="$t('myProfile.EDIT')"
                        customClass="btnSave"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </form>
            </v-card>
          </v-col>
        </v-row>


        <!--new profile ui ended here-->


      </v-flex>
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    metaInfo() {
      return {
        title: this.$store.getters.appTitle,
        titleTemplate: `${this.$t('myProfile.TITLE')} - %s`
      }
    },
    data() {
      return {
        dialog: false,
        triggerChangePassword: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        searchInput: ''
      }
    },
    computed: {
      name: {
        get() {
          return this.$store.state.profile.profile.name
        },
        set(value) {
          const data = {
            key: 'name',
            value
          }
          this.addProfileData(data)
        }
      },
      email() {
        return this.$store.state.profile.profile.email
      },
      phone: {
        get() {
          return this.$store.state.profile.profile.phone
        },
        set(value) {
          const data = {
            key: 'phone',
            value
          }
          this.addProfileData(data)
        }
      },
      allCities() {
        return this.$store.state.cities.allCities
      },
      city: {
        get() {
          return this.$store.state.profile.profile.city
        },
        set(value) {
          const data = {
            key: 'city',
            value
          }
          this.addProfileData(data)
        }
      },
      country: {
        get() {
          return this.$store.state.profile.profile.country
        },
        set(value) {
          const data = {
            key: 'country',
            value
          }
          this.addProfileData(data)
        }
      },
      urlTwitter: {
        get() {
          return this.$store.state.profile.profile.urlTwitter
        },
        set(value) {
          const data = {
            key: 'urlTwitter',
            value
          }
          this.addProfileData(data)
        }
      },
      urlGitHub: {
        get() {
          return this.$store.state.profile.profile.urlGitHub
        },
        set(value) {
          const data = {
            key: 'urlGitHub',
            value
          }
          this.addProfileData(data)
        }
      }
    },
    methods: {
      ...mapActions([
        'changeMyPassword',
        'getProfile',
        'addProfileData',
        'saveProfile'
      ]),
      async submit() {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.saveProfile({
            name: this.name,
            phone: this.phone,
            city: this.city,
            country: this.country,
            urlTwitter: this.urlTwitter,
            urlGitHub: this.urlGitHub
          })
        }
      },
      close() {
        this.triggerChangePassword = false
        this.dialog = false
      },
      async save() {
        try {
          const valid = await this.$validator.validateAll()
          if (valid) {
            await this.changeMyPassword({
              oldPassword: this.oldPassword,
              newPassword: this.newPassword
            })
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
            this.triggerChangePassword = false
            this.close()
            return
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.oldPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
          this.triggerChangePassword = false
          this.close()
        }
      }
    },
    async mounted() {
      await this.getProfile()
    }
  }
</script>
<style scoped>

</style>
