import { writable } from 'svelte/store'

type Data = Array<[number, number]>

const createData = () => {
  const { subscribe, set, update } = writable<Data>([])

  const init = (size: number) => {
    const data = []
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        data.push([x, y])
      }
    }
    return data
  }

  const move = (data: Data, i: number) => {
    const target = data[i]
    const empty = data[data.length - 1]
    if (target[0] == empty[0]) {
      const x = target[0]
      if (target[1] < empty[1]) {
        for (let y = empty[1] - 1; y >= target[1]; y--) {
          empty[1] = y
          data[data.indexOf([x, y])][1] = y + 1
        }
      } else if (empty[1] < target[1]) {
        for (let y = empty[1] + 1; y <= target[1]; y++) {
          empty[1] = y
          data[data.indexOf([x, y])][1] = y - 1
        }
      }
    } else if (target[1] == empty[1]) {
      const y = target[1]
      if (target[0] < empty[0]) {
        for (let x = empty[0] - 1; x >= target[0]; x--) {
          empty[0] = x
          data[data.indexOf([x, y])][0] = x + 1
        }
      } else if (empty[0] < target[0]) {
        for (let x = empty[0] + 1; x <= target[0]; x++) {
          empty[0] = x
          data[data.indexOf([x, y])][0] = x - 1
        }
      }
    }
    return data
  }

  return {
    subscribe,
    init: (size: number) => set(init(size)),
    move: (i: number) => update(data => move(data, i)),
  }
}

export const data = createData()
