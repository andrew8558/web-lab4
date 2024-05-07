<template>
  <div class="container">
    <h1>Регистрация</h1>
    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="username">Логин:</label>
        <input type="text" id="username" v-model="formData.username" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="formData.password" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="re_password">Повторите пароль:</label>
        <input type="password" id="re_password" v-model="formData.re_password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        re_password: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:8000/auth/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
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
</style>

