<template>
  <div class="container">
    <h1>Добавление нового студента</h1>
    <form @submit.prevent="createStudent" class="form">
      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input type="text" id="lastName" v-model="formData.lastName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input type="text" id="firstName" v-model="formData.firstName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="gender">Пол:</label>
        <select id="gender" v-model="formData.gender" class="form-control" required>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
      <div class="form-group">
        <label for="class">Класс:</label>
        <select id="class" v-model="formData.class" class="form-control" required>
          <option v-for="cl in classes" :key="cl.id" :value="cl.id">{{cl.number}}{{cl.letter}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Добавить студента</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        gender: '',
        class: ''
      },
      classes: []
    };
  },
  created() {
    this.fetchClasses();
  }, 
  methods: {
    async fetchClasses() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/classes/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        this.classes = data;
      } catch (error) {
        console.error(error);
      }
    },
    async createStudent() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/students/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            first_name: this.formData.firstName,
            last_name: this.formData.lastName,
            gender: this.formData.gender,
            class_assigned: this.formData.class
          })
        });
        if (!response.ok) {
          throw new Error('Failed to create student');
        }
        location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
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
}
</style>
