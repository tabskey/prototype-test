<template>
    <div>Teste
      
    <label class="btn btn-default">
      <!--<input type="file" ref="file" @change="selectFile" />
      -->
      <input ref="my-file_id" type="file" onChange="handleFileChange" multiple>
    </label>

    <button class="btn btn-success" :disabled="!handleFileChange" @click="upload">
      Upload
    </button>
    </div>
</template>
<script>
//import pdftext from 'pdf-to-text';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        upload(){
             const objFile = this.$refs["file_id"];
      if (objFile.value === "") {
        alert("Please select a File！"); // inserir um modal futuramente
        return;
      } else {
        const files = objFile.state.uploadFiles;
        console.log("Files");
        console.log(files);
        }
    },
}
}
</script>