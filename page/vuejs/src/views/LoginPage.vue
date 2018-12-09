<template>
  <div id="content">
    <form novalidate class="md-layout" @submit.prevent="validateBeforeSubmit">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <!-- <div v-if="users.result == 'failed'" class="alert">Login failed</div> -->
          <!-- <div class="md-alert">Login failed</div> -->
          <md-field :class="{ 'md-invalid': errors.has('email') }">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" v-model="email" v-validate="'required|email'" autocomplete="email" :disabled="status.loggingIn" />
            <span class="md-error" v-show="email.invalid">{{ errors.first('email') }}</span>
          </md-field>
          <md-field :class="{ 'md-invalid': errors.has('password') }">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" v-model="password" v-validate="'required'" :disabled="status.loggingIn" />
            <span class="md-error" v-show="password.invalid">{{ errors.first('password') }}</span>
          </md-field>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="status.loggingIn" />
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary" :disabled="status.loggingIn">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            alert: state => state.alert
        })
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
        // eslint-disable-next-line
        handleSubmit () {
            this.submitted = true;
            const { email, password } = this;
            if (email && password) {
                this.login({ email, password })
            }
        },
        // eslint-disable-next-line
        validateBeforeSubmit(e) {
            e.preventDefault();
            this.$validator.validateAll().then((valid) => {
                if (valid) {
                    this.handleSubmit()
                }
            }).catch(() => {
                return false
            });
        }
    },
    watch: {
        // eslint-disable-next-line
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

<style lang="scss" scoped>
#content {
  height: 100vh;
  background-color: #000000;
  padding-top: 100px;
}

.md-layout {
  width: 400px;
  margin: auto;  
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
