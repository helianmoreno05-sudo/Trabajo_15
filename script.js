const { createApp, ref, computed } = Vue;

const TarjetaFlash = {
  props: ["pregunta", "respuesta", "mostrar"],
  emits: ["anterior", "voltear", "siguiente"],
  template: `
    <div class="tarjeta">
      <div class="contenido">
        <p v-if="!mostrar" class="pregunta">{{ pregunta }}</p>
        <p v-else class="respuesta">{{ respuesta }}</p>
      </div>
      <div class="botones">
        <button @click="$emit('anterior')">‹ Anterior</button>
        <button @click="$emit('voltear')">{{ mostrar ? 'Ocultar respuesta' : 'Mostrar respuesta' }}</button>
        <button @click="$emit('siguiente')">Siguiente ›</button>
      </div>
    </div>
  `
};

createApp({
  components: { TarjetaFlash },
  setup() {
    const tarjetas = [
      { pregunta: "¿Cual es la capital de Colombia?", respuesta: "Bogota." },
      { pregunta: "¿Cuantos departamentos tiene Colombia?", respuesta: "32 departamentos." },
      { pregunta: "¿Que mares bañan las costas de Colombia?", respuesta: "El oceano Pacífico y el mar Caribe." }
    ];

    const indice = ref(0);
    const mostrar = ref(false);

    const porcentaje = computed(() => Math.round(((indice.value + 1) / tarjetas.length) * 100));

    function siguiente() {
      indice.value = (indice.value + 1) % tarjetas.length;
      mostrar.value = false;
    }

    function anterior() {
      indice.value = (indice.value - 1 + tarjetas.length) % tarjetas.length;
      mostrar.value = false;
    }

    function voltear() {
      mostrar.value = !mostrar.value;
    }

    return { tarjetas, indice, mostrar, porcentaje, siguiente, anterior, voltear };
  }
}).mount("#app");
