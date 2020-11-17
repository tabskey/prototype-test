  <template>
  <div class="demo">
    <div class="header">HUAWEI</div>
    <div class="main">
      <form action="#" method="post" enctype="multipart/form-data" @submit.prevent="getFiles">
        <div class="file is-boxed">
          <label class="file-label">
            <input class="file-input" id="file_id" type="file" name="resume" multiple accept="application/pdf">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
          </label> <span><input class="button" type="submit" value="Submit input"></span>
        </div>
      </form>
      <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.url">{{ file.name }}</a>
        </li>
      </ul>
    </div>
    </div>
    <div class="footer">
      Em caso de dúvidas, contate a equipe de
    </div>
  </div>
</template>
<script>
//import PDFJS from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
//import pdfjsWorker from "pdfjs-dist/build/pdf.worker";
//"pdfjs-dist";


//import PdfjsWorker from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js";
export default {
  components: {
  },
  data() {
    return {
      selectedFiles: undefined,
      progressInfos: [],
      message: "",

      fileInfos: [],
    };
  },
  methods: {
     async getFiles() { 
      var files = document.getElementById("file_id").files;
      console.log('files', files)
      const size = files.length
      if (size > 0) {

        for (var i = 0; i < size; i++) {
          var file = files[i];
          var fileReader = new FileReader();
          console.log(file); 
           var p = new Promise((resolve) =>{ // resolve,reject
             console.log("teste");
             fileReader.onload = function(event) {
            // mágica 
            console.log("promise")
            console.log(event.target.result)
            var base64File = event.target.result;
            var urlBase64 = base64File.replace(/^data:.+;base64,/, "");
            console.log(urlBase64);
            resolve(urlBase64);
          };
           })
           fileReader.readAsDataURL(file);
          var result = await p;         
           
          var pdfData = atob(result);
          console.log(pdfData);
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;        //  pdfjsLib.disableWorker = false;

        var loadingTask = pdfjsLib.getDocument({ data: pdfData });
        // this.accessPDF();
        console.log(loadingTask);
        loadingTask.promise.then((pdf) =>{
          var pdfDocument = pdf;
          var pagesPromises = [];

          for (var i = 0; i < pdf.numPages; i++) {
            // Required to prevent that i is always the total of pages
            //(function(pageNumber) {
              pagesPromises.push(this.getPageText(i + 1, pdfDocument));
           // })(i + 1);
          }

          Promise.all(pagesPromises).then(function(pagesText) {
            // Display text of all the pages in the console
            console.log(pagesText);
          });
        });

        }
        }
     },
    convertTobase64() {
      const objFile = this.$refs["file_id"];
      if (objFile.value === "") {
        alert("Please select a File！");
        return;
      }

      const files = objFile.state.uploadFiles;
      // These are your current files
      console.log("Files");
      console.log(files);
      let file = files[0].raw;
      // FORMAT LIMITER
      // if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
      //   return alert(
      //     "The upload format is incorrect. Please upload xls or xlsx format",
      //   );
      // }
      console.log(file);
      const fileReader = new FileReader();
      // fileReader.addEventListener('onload',this.readFile);
      //  fileReader.addEventListener('load', () => {
      //     this.fatturaUpload = fr.result;
      //  });
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        const data = fileReader.result;
        // this.gettext(data);
        var urlBase64 = data.replace(/^data:.+;base64,/, "");
        console.log(urlBase64);
        var pdfData = atob(urlBase64);
        var pdfjsLib = window["pdfjs-dist/build/pdf"];
        //  pdfjsLib.disableWorker = false;

        var loadingTask = pdfjsLib.getDocument({ url: pdfData });
        // this.accessPDF();
        console.log(loadingTask);
        this.loadingTask.promise.then(function(pdf) {
          var pdfDocument = pdf;
          var pagesPromises = [];

          for (var i = 0; i < pdf.numPages; i++) {
            // Required to prevent that i is always the total of pages
            //(function() { //(PageNumber)
              pagesPromises.push(this.getPageText(i + 1, pdfDocument));
           // });
          }

          Promise.all(pagesPromises).then(function(pagesText) {
            // Display text of all the pages in the console
            console.log(pagesText);
          });
        });
      });

    },
    getPageText(pageNum, PDFDocumentInstance) {
      // Return a Promise that is solved once the text of the page is retrieven
      return new Promise(function(resolve) {
        PDFDocumentInstance.getPage(pageNum).then(function(pdfPage) {
          // The main trick to obtain the text of the PDF page, use the getTextContent method
          pdfPage.getTextContent().then(function(textContent) {
            var textItems = textContent.items;
            var finalString = "";

            // Concatenate the string of the item to the final string
            for (const item of textItems) {
              finalString += item.str + " ";
            }

            // Solve promise with the text retrieven from the page
           
            console.log(finalString); 
            resolve(finalString);
          });
        });
      });
    },
  },
};
</script> 