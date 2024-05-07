<template>
  <div class="container">
    <h1>Вход</h1>
    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label for="username">Логин:</label>
        <input type="text" id="username" v-model="FormData.username" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="FormData.password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
    </form>
    <router-link to="/registration" class="btn btn-link">Регистрация</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FormData: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:8000/auth/token/login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.FormData)
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        const token = data.auth_token;
        localStorage.setItem('token', token);
        this.$router.push('/home');
      } catch (error) {
        console.error(error)
      }
    } 
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

.form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-link {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
