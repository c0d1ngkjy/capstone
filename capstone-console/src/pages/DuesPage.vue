<template>
  <q-page class="q-pa-xl">
    <div class="row items-center">
      <q-icon size="lg" name="receipt_long" class="q-mr-md" />
      <div class="text-h5 text-bold">회비 내역</div>
    </div>

    <div class="bg-white q-px-md q-mt-lg" style="border-radius: 12px;">
      <div class="text-h4 text-bold text-primary q-py-lg">122,233,213 원</div>
      <q-list separator>
        <q-item class="text-bold text-grey">
          <q-item-section>
            <q-item-label>분류</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>내역</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>비고</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>날짜</q-item-label>
          </q-item-section>


          <q-item-section>금액</q-item-section>
          <q-item-section side>
            <q-item-label class="q-px-md">수정</q-item-label>
          </q-item-section>

        </q-item>

        <q-item v-for="x in 10" :key="x">
          <q-item-section>
            <q-item-label>
              {{x%2 == 0 ? '지출' : '수입'}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>정기 회식 1차</q-item-label>
          </q-item-section>
          <q-item-section>

            회식
          </q-item-section>
          <q-item-section>
            {{ new Date().toLocaleDateString('ko-KR').slice(0, -1) }}
          </q-item-section>

          <q-item-section>1111123 원</q-item-section>
          <q-item-section side>
            <q-btn unelevated color="negative" icon="delete" style="border-radius: 8px;" />
          </q-item-section>

        </q-item>
      </q-list>

    </div>
  </q-page>
</template>
<script setup>
defineOptions({
  name: 'DuesPage'
})
</script>
