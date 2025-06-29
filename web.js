"use strict";

const start = () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) algorithm.BubbleSort();
  if (algoValue === 2) algorithm.SelectionSort();
  if (algoValue === 3) algorithm.InsertionSort();
  if (algoValue === 4) algorithm.MergeSort();
  if (algoValue === 5) algorithm.QuickSort();
};

const RenderScreen = () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  RenderList();
};

const RenderList = () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  clearScreen();

  let list = randomList(sizeValue);
  const arrayNode = document.querySelector(".array");

  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  clearScreen();

  let list = randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;

const algoInfo = {
  1: {
    name: "Bubble Sort",
    time: "O(n²)",
    space: "O(1)",
    code: `for (let i = 0; i < n-1; i++) {
  for (let j = 0; j < n-i-1; j++) {
    if (arr[j] > arr[j+1]) {
      swap(arr[j], arr[j+1]);
    }
  }
}`,
    wiki: "https://en.wikipedia.org/wiki/Bubble_sort",
  },
  2: {
    name: "Selection Sort",
    time: "O(n²)",
    space: "O(1)",
    code: `for (let i = 0; i < n; i++) {
  let min = i;
  for (let j = i+1; j < n; j++) {
    if (arr[j] < arr[min]) min = j;
  }
  swap(arr[i], arr[min]);
}`,
    wiki: "https://en.wikipedia.org/wiki/Selection_sort",
  },
  3: {
    name: "Insertion Sort",
    time: "O(n²)",
    space: "O(1)",
    code: `for (let i = 1; i < n; i++) {
  let key = arr[i], j = i-1;
  while (j >= 0 && arr[j] > key) {
    arr[j+1] = arr[j];
    j--;
  }
  arr[j+1] = key;
}`,
    wiki: "https://en.wikipedia.org/wiki/Insertion_sort",
  },
  4: {
    name: "Merge Sort",
    time: "O(n log n)",
    space: "O(n)",
    code: `function mergeSort(arr) {
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    // Copy data to temp arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    // Merge the temp arrays back into arr[]
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }

    // Copy the remaining elements of L[], if any
    while (i < n1)
        arr[k++] = L[i++];

    // Copy the remaining elements of R[], if any
    while (j < n2)
        arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}
}`,
    wiki: "https://en.wikipedia.org/wiki/Merge_sort",
  },
  5: {
    name: "Quick Sort",
    time: "O(n log n)",
    space: "O(log n)",
    code: `function quickSort(arr, low, high) {
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // pivot
    int i = (low - 1);     // Index of smaller element

    for (int j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] < pivot) {
            i++; // increment index of smaller element
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[p] is now at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
}`,
    wiki: "https://en.wikipedia.org/wiki/Quicksort",
  },
};

function updateInfoPanel() {
  const algoValue = Number(document.querySelector(".algo-menu").value);
  const info = algoInfo[algoValue];
  document.getElementById("algo-title").innerText = info
    ? info.name
    : "Algorithm Info";
  document.getElementById("time-complexity").innerText = info
    ? info.time
    : "-";
  document.getElementById("space-complexity").innerText = info
    ? info.space
    : "-";
  document.getElementById("algo-code").innerText = info
    ? info.code
    : "Select an algorithm to view code.";
  document.getElementById("wiki-link").href = info ? info.wiki : "#";
  document.getElementById("wiki-link").innerText = info ? "Wikipedia" : "";
}

// Update info panel when algorithm changes
document.querySelector(".algo-menu").addEventListener("change", () => {
  updateInfoPanel();
  RenderScreen();
});

// On page load, show default info
window.onload = () => {
  updateInfoPanel();
  RenderScreen();
};

function merge(left, right) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  // Add remaining elements
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap arr[i+1] and arr[high] (pivot)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
