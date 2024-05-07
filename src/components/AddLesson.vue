<template>
  <div class="container">
    <h1>Расписание уроков</h1>
    <form @submit.prevent="updateSchedule" class="form">
      <div class="form-group">
        <label for="class">Выберите класс:</label>
        <select id="class" v-model="selectedClass" class="form-control" required>
          <option v-for="classItem in classes" :key="classItem.id" :value="classItem.id">{{ classItem.number }}{{ classItem.letter }}</option>
        </select>
      </div>
      <div class="form-group" v-if="selectedClass">
        <label for="course">Выберите предмет:</label>
        <select id="course" v-model="selectedCourse" class="form-control" required>
          <option v-for="course in filteredCourses" :key="course.id" :value="course.id">{{ course.subject.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Выберите дату:</label>
        <input type="date" id="date" v-model="selectedDate" class="form-control" :min="minDate" required>
      </div>
      <div class="form-group">
        <label for="lesson">Выберите номер урока:</label>
        <select id="lesson" v-model="selectedLesson" class="form-control" required>
          <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="room">Выберите кабинет:</label>
        <select id="room" v-model="selectedRoom" class="form-control" required>
          <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.number }}</option>
        </select>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button type="submit" class="btn btn-primary">Добавить урок</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classes: [],
      selectedClass: null,
      courses: [],
      selectedCourse: null,
      selectedDate: null,
      selectedLesson: null,
      selectedRoom: null,
      rooms: [],
      minDate: null,
      schedule: [],
      error: null
    };
  },
  created() {
    this.fetchClasses();
    this.fetchCourses();
    this.fetchSchedule();
    this.fetchRooms();
    this.setMinDate();
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(course => {
        return course.class_id.id === this.selectedClass;
      });
    },
  },
  methods: {
    async fetchRooms() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/rooms/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        this.rooms = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSchedule() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/schedule/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch schedule');
        }
        const data = await response.json();
        this.schedule = data;
      } catch (error) {
        console.error(error);
      }
    },
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
    async fetchCourses() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/courses/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateSchedule() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const existingLesson = this.schedule.find(lesson => {
          return lesson.course.class_id.id === this.selectedClass &&
                lesson.date === this.selectedDate &&
                lesson.lesson_number === this.selectedLesson;
        });

        if (existingLesson) {
          this.error = 'У этого класса уже есть предмет в выбранное время';
          return;
        }

        const conflictingRoom = this.schedule.find(lesson => {
          return lesson.date === this.selectedDate &&
                lesson.lesson_number === this.selectedLesson &&
                lesson.room === this.selectedRoom;
        });

        if (conflictingRoom) {
          this.error = 'В выбранное время в этом кабинете проводится другой урок';
          return;
        }

        const response = await fetch('http://localhost:8000/api/schedule/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            course: this.selectedCourse,
            date: this.selectedDate,
            lesson_number: this.selectedLesson,
            room: this.selectedRoom
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update schedule');
        }
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    setMinDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      this.minDate = `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.btn {
  cursor: pointer;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

label {
  font-weight: bold;
}

input[type="date"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.alert {
  margin-top: 10px;
  padding: 10px;
}
</style>
