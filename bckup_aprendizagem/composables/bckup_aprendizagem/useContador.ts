import { ref,computed,watch } from 'vue';



export function useContador() {

    const contador = ref(0)

    const dobro = computed(() => {
        return contador.value * 2
    })

    watch(contador, (novoValor, valorAnterior) => {
        console.log(`Contador fez mudou de ${valorAnterior} para ${novoValor}`);
    })

    const incrementar = () => {
        contador.value++
    }

    const decrementar = () => {
        contador.value--
    }

    const zerar = () => {
        contador.value = 0
    }

    return {
        contador,
        incrementar,
        decrementar,
        zerar,
        dobro
    }

}