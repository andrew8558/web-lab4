<template>
  <div class="container">
    <h1>Добавление нового учителя</h1>
    <form @submit.prevent="createTeacher" class="form">
      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input type="text" id="lastName" v-model="formData.lastName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input type="text" id="firstName" v-model="formData.firstName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="middleName">Отчество:</label>
        <input type="text" id="middleName" v-model="formData.middleName" class="form-control">
      </div>
      <div class="form-group">
        <label for="class">Кабинет:</label>
        <select id="class" v-model="formData.room" class="form-control" >
          <option v-for="room in rooms" :key="room.id" :value="room.id">{{room.number}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Добавить учителя</button>
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
        middleName: '',
        room: '',
      },
      rooms: []
    };
  },
  created () {
    this.fetchRooms()
  },
  methods: {
    async fetchRooms() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/free-rooms/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        this.rooms = data;
        this.rooms.push({"number": "Нет кабинета", "id":""})
      } catch (error) {
        console.error(error);
      }
    },
    async createTeacher() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/teachers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            first_name: this.formData.firstName,
            last_name: this.formData.lastName,
            middle_name: this.formData.middleName,
            room: this.formData.room
          })
        });
        if (!response.ok) {
          throw new Error('Failed to create teacher');
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
