<template>
    <div>
        {{ Log.date }} • {{ Log.user?.name }} {{ Log.text }} 
    </div>
</template>


<script setup>
    const { Log } = define (["log"])
</script>