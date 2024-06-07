<template>
  <q-page class="q-pa-xl">
    <div class="bg-white q-pa-md" style="border-radius: 12px;">
      <div class="flex items-start">
        <q-date class="col" style="border-radius: 12px;" flat v-model="selectedDate" landscape mask="YYYY/MM/DD"
          :locale="locale" @input="updateSelectedDate" />

        <q-list class="col q-ml-md bg-blue-grey-1" style="border-radius: 12px;">
          <q-item v-for="(todo, index) in todos[selectedDate]" :key="index" style="border-radius: 12px;">
            <q-item-section>{{ todo }}</q-item-section>
            <q-item-section side>
              <q-btn size="sm" unelevated @click="removeTodo(selectedDate, index)" color="negative" icon="delete"
                style="border-radius: 8px;" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-mt-md">
        <div class="flex bg-white " style="border-radius: 12px;">
          <q-input borderless v-model="newTodo" label="일정 추가하기" @keyup.enter="addTodo"
            class="col bg-blue-grey-1 q-px-md" style="border-radius: 12px;">
            <template v-slot:append>
              <q-btn unelevated color="primary" label="추가" @click="addTodo" class="q-ml-sm q-px-md"
                style="border-radius: 8px;" />
            </template>
          </q-input>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref, watch } from 'vue';

defineOptions({
  name: 'CalendarPage'
})
const $q = useQuasar()

const selectedDate = ref('');
const newTodo = ref('');
const todos = ref({});

watch(todos.value, () => console.log(todos.value))

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC'
};
onMounted(() => {
  selectedDate.value = new Date().toLocaleDateString('ko-KR', options).replace(/\./g, '/').replace(/ /g, '').slice(0, -1);
  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }
})

const locale = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};

const updateSelectedDate = () => {
  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }
};

const addTodo = () => {
  if (!newTodo.value.trim()) {
    // $q.notify({
    //   message: '일정을 입력해주세요',
    //   color: 'red'
    // })
    return
  }
  if (!todos.value[selectedDate.value]) {
    todos.value[selectedDate.value] = [];
  }

  todos.value[selectedDate.value].push(newTodo.value.trim());
  newTodo.value = '';
};

const removeTodo = (date, index) => {
  todos.value[date].splice(index, 1);
};
</script>
