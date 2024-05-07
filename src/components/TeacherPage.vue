<template>
  <div class="container">
    <h1>Информация об учителе</h1>
    <form v-if="editing" @submit.prevent="updateTeacher" class="form">
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
        <input type="text" id="middleName" v-model="formData.middleName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="class">Кабинет:</label>
        <select id="class" v-model="formData.room" class="form-control" >
          <option v-for="room in rooms" :key="room.id" :value="room.id">{{room.number}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button @click="deleteTeacher" class="btn btn-danger">Удалить</button>
    </form>
    <div v-else>
      <p><strong>Фамилия:</strong> {{ formData.lastName }}</p>
      <p><strong>Имя:</strong> {{ formData.firstName }}</p>
      <p><strong>Отчество:</strong> {{ formData.middleName }}</p>
      <p><strong>Кабинет:</strong> {{ room }}</p>
      <p><strong>Класс:</strong> {{ teacherClass }}</p>
      <button @click="editTeacher" class="btn btn-primary">Изменить</button>
    </div>
    <h2>Расписание учителя</h2>
    <table v-if="schedule.length" class="table">
      <thead class="thead-dark">
        <tr>
          <th>Дата</th>
          <th>Номер урока</th>
          <th>Кабинет</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lesson, index) in schedule" :key="index">
          <td>{{ lesson.date }}</td>
          <td>{{ lesson.lesson_number }}</td>
          <td>{{ lesson.room }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Расписание отсутствует</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        middleName: '',
        lastName: '',
        room: '',
      },
      room: "Нет кабинета",
      editing: false,
      teacherClass: "Нет класса",
      schedule: [],
      rooms: []
    };
  },
  created() {
    const teacherId = this.$route.params.id;
    this.fetchRooms()
    this.fetchTeacher(teacherId);
    this.fetchClass(teacherId);
    this.fetchSchedule(teacherId);
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
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClass(teacherId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/teacher-class/${teacherId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch class');
        }
        const data = await response.json();
        this.teacherClass = `${data.number}${data.letter}`;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTeacher(teacherId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/teachers/${teacherId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch teacher');
        }
        const data = await response.json();
        this.formData.firstName = data.first_name;
        this.formData.middleName = data.middle_name;
        this.formData.lastName = data.last_name;
        if (data.room != null) {
          this.room = data.room.number;
          this.rooms.push(data.room);
          this.formData.room = data.room.id;
        }
        this.rooms.push({"number": "Нет кабинета", "id": ""});
      } catch (error) {
        console.error(error);
      }
    },
    async updateTeacher() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const teacherId = this.$route.params.id;
        const response = await fetch(`http://localhost:8000/api/teachers/${teacherId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            first_name: this.formData.firstName,
            middle_name: this.formData.middleName,
            last_name: this.formData.lastName,
            room: this.formData.room,
          })
        });
        if (!response.ok) {
          throw new Error('Failed to update teacher');
        }
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTeacher() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const teacherId = this.$route.params.id;
        const response = await fetch(`http://localhost:8000/api/teachers/${teacherId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }
        this.$router.push('/teachers');
      } catch (error) {
        console.error(error);
      }
    },
    editTeacher() {
      this.editing = true;
    },
    async fetchSchedule(teacherId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/teacher-schedule/${teacherId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch teacher schedule');
        }
        const data = await response.json();
        this.schedule = data;
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

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
}

.table th {
  background-color: #007bff;
  color: #fff;
}

.table tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>

