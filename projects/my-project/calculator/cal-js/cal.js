    // حالت‌ها:
    // current: عددی که الان تایپ می‌کنیم
    // pending: عملگر انتخاب شده
    // left: عدد سمت چپ عملیات
    // afterOperator: یعنی بعد از انتخاب عملگر وارد تایپ جدید شدیم
    const resultEl = document.getElementById('result');
    const equationEl = document.getElementById('equation');
    const statusBadge = document.getElementById('statusBadge');

    let current = "0";
    let left = null;
    let pending = null;
    let afterOperator = false;
    let error = false;

    function setStatus(text, kind="normal"){
      statusBadge.textContent = text;
      statusBadge.style.borderColor = "rgba(255,255,255,.14)";
      statusBadge.style.background = "rgba(255,255,255,.06)";
      if(kind === "danger"){
        statusBadge.style.borderColor = "rgba(239,68,68,.55)";
        statusBadge.style.background = "rgba(239,68,68,.14)";
      }else if(kind === "ok"){
        statusBadge.style.borderColor = "rgba(34,197,94,.55)";
        statusBadge.style.background = "rgba(34,197,94,.14)";
      }else if(kind === "info"){
        statusBadge.style.borderColor = "rgba(59,130,246,.55)";
        statusBadge.style.background = "rgba(59,130,246,.14)";
      }
    }

    function formatNumber(str){
      // برای جلوگیری از خیلی طولانی شدن
      if(str.length > 22) return str.slice(0,22);
      return str;
    }

    function render(){
      resultEl.textContent = formatNumber(current);
    }

    function clearAll(){
      current = "0";
      left = null;
      pending = null;
      afterOperator = false;
      error = false;
      equationEl.textContent = "";
      render();
      setStatus("آماده", "info");
    }

    function backspace(){
      if(error) return;
      if(afterOperator) return; // اگر تازه عملگر زدیم، پاک کردن معنی نداره

      if(current.length <= 1){
        current = "0";
      }else{
        current = current.slice(0, -1);
        if(current === "-" ) current = "0";
      }
      render();
    }

    function toggleSign(){
      if(error) return;
      if(current === "0") return;
      if(current.startsWith("-")) current = current.slice(1);
      else current = "-" + current;
      render();
    }

    function inputDigit(d){
      if(error) return;
      if(afterOperator){
        current = d;
        afterOperator = false;
      }else{
        if(current === "0") current = d;
        else current = current + d;
      }
      render();
    }

    function inputDot(){
      if(error) return;
      if(afterOperator){
        current = "0.";
        afterOperator = false;
        render();
        return;
      }
      if(!current.includes(".")){
        current += ".";
      }
      render();
    }

    function opSymbol(op){
      if(op === "*") return "×";
      return op === "/" ? "÷" : op;
    }

    function chooseOperator(op){
      if(error) return;

      const curNum = Number(current);

      if(pending && left !== null && !afterOperator){
        // زنجیره‌ای: اگر قبلاً هم عملگر داشتیم و عدد جدید تایپ شده، حساب کن
        const res = compute(left, pending, curNum);
        if(res === "error"){
          showError();
          return;
        }
        left = res;
        current = String(res);
      }else{
        left = left === null ? curNum : left;
      }

      pending = op;
      afterOperator = true;
      equationEl.textContent = `${left} ${opSymbol(op)}`;
      setStatus("عملیات انتخاب شد", "info");
    }

    function compute(a, op, b){
      switch(op){
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/":
          if(b === 0) return "error";
          return a / b;
        default:
          return "error";
      }
    }

    function showError(){
      error = true;
      pending = null;
      left = null;
      afterOperator = false;
      current = "خطا";
      equationEl.textContent = "";
      render();
      setStatus("تقسیم بر صفر!", "danger");
    }

    function equals(){
      if(error) return;
      if(pending === null || left === null) return;

      const curNum = Number(current);
      const res = compute(left, pending, curNum);
      if(res === "error"){
        showError();
        return;
      }

      equationEl.textContent = `${left} ${opSymbol(pending)} ${curNum} =`;
      current = String(res);
      left = null;
      pending = null;
      afterOperator = false;

      render();
      setStatus("انجام شد", "ok");
    }

    // رویدادهای دکمه‌ها
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const digit = btn.getAttribute('data-digit');
        const op = btn.getAttribute('data-op');
        const action = btn.getAttribute('data-action');

        if(digit !== null) return inputDigit(digit);
        if(op !== null) return chooseOperator(op);

        if(action === 'clear') return clearAll();
        if(action === 'backspace') return backspace();
        if(action === 'sign') return toggleSign();
        if(action === 'dot') return inputDot();
        if(action === 'equals') return equals();
      });
    });

    // پشتیبانی از کیبورد
    window.addEventListener('keydown', (e) => {
      const key = e.key;

      if(key >= '0' && key <= '9') return inputDigit(key);
      if(key === '.') return inputDot();
      if(key === 'Enter' || key === '=') return equals();
      if(key === 'Backspace') return backspace();
      if(key === 'Escape') return clearAll();

      // عملگرها
      if(key === '+' || key === '-' || key === '*' || key === '/'){
        e.preventDefault();
        chooseOperator(key);
      }
    });

    // شروع
    setStatus("آماده", "info");
    render();