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
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.487/pdf.min.js"></script>

<script>
import pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker";
//"pdfjs-dist";
//import pdf from "pdf-extraction";

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
     getFiles() { 
      var files = document.getElementById("file_id").files;
      console.log('files', files)
      const size = files.length
      if (size > 0) {

        for (var i = 0; i < size; i++) {
          var file = files[i];
          var fileReader = new FileReader();
          fileReader.onload = function(event) {
            // mágica 
            console.log(event.target.result)
            var base64File = event.target.result;
            var urlBase64 = base64File.replace(/^data:.+;base64,/, "");
            console.log(urlBase64)
          }
          fileReader.readAsDataURL(file);
        }



        // var fileToLoad = files[0];
        // var fileReader = new FileReader();
        // var base64File;
        // // Reading file content when it's loaded
        // fileReader.onload = function(event) {
        //     base64File = event.target.result;
        //     // base64File console
        //     console.log(base64File);
        //     var urlBase64 = base64File.replace(/^data:.+;base64,/, "");
        

        // // Convert data to base64
        // var teste = fileReader.readAsDataURL(fileToLoad);
        //  var pdfData = atob(urlBase64);
        // var pdfjsLib = window["pdfjs-dist/build/pdf"];
        // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        // var loadingTask = pdfjsLib.getDocument({ data: pdfData });
      
        // // this.accessPDF();
        // console.log(loadingTask);
        // this.loadingTask.promise.then(function(pdf) {
        //   var pdfDocument = pdf;
        //   var pagesPromises = [];

        //   for (var i = 0; i < pdf.numPages; i++) {
        //     // Required to prevent that i is always the total of pages
        //     (function(pageNumber) {
        //       pagesPromises.push(this.getPageText(pageNumber, pdfDocument));
        //     })(i + 1);
        //   }

        //   Promise.all(pagesPromises).then(function(pagesText) {
        //     // Display text of all the pages in the console
        //     console.log(pagesText);
        //   });
        // });
        //   };
        }
     },
    // convertToURL() {
    //   const objFile = this.$refs["file_id"];
    //   if (objFile.value === "") {
    //     alert("Please select a File！"); // inserir um modal futuramente
    //     return;
    //   } else {
    //     const files = objFile.state.uploadFiles;
    //     console.log("Files");
    //     console.log(files);
    //     if (files.length > 0) {
    //       var fileToLoad = files[0].raw;
    //       //var fileReader = new FileReader();
    //     }
    //     return fileToLoad;
    //   }
    // },
    // previewPDF() {
    //   var files = document.querySelector("input[type=file]").files;
    //   console.log(files);
    //   if (files && files.length >= 1) {
    //     files.foreach(file => {
    //       this.convertToURL(file)
    //         .then(data => {
    //           console.log(data);
    //           console.log(file); // 把編碼後的字串輸出到console
    //         })
    //         .catch(error => console.log(error));
    //     });
    //   }
    // },
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
            (function(pageNumber) {
              pagesPromises.push(this.getPageText(pageNumber, pdfDocument));
            })(i + 1);
          }

          Promise.all(pagesPromises).then(function(pagesText) {
            // Display text of all the pages in the console
            console.log(pagesText);
          });
        });
      });

      // console.log(dat);
      // fileReader.readAsDataURL(data);
      //How to remove files
      // handleRemove(file,fileList){
      //     this.fileTemp = null
      // },
      // },
      // gettext(data) {
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
            resolve(finalString);
            console.log(finalString);
            return finalString;
          });
        });
      });
    },
  },
};
</script> 