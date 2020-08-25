function getTemplate(
  data=[],
  placeholder="Placeholder по умолчанию"
) {
  const list = data.map(
    ({id, value}) => `<li class="select__item" data-type="item" data-id="${id}">${value}</li>`
  ).join("");

  return ` 
          <div class="select__backdrop" data-type="backdrop"></div>         
          <div class="select__input" data-type="input">
            <span data-type="value">
              ${placeholder}
            </span>

            <i class="fas fa-chevron-down" data-type="arrow"></i>
          </div>
          
          <div class="select__dropdown">
            <ul class="select__list" id="list">
              ${list}            
            </ul>
          </div>
  `;
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId.toString();

    this.#render();
    this.#setup();
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.remove("fa-chevron-down");
    this.$arrow.classList.add("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.remove("fa-chevron-up");
    this.$arrow.classList.add("fa-chevron-down");

  }

  #render() {
    const {placeholder, data} = this.options;

    this.$el.classList.add("select")
    this.$el.innerHTML = getTemplate(data, placeholder);
    this.$value = this.$el.querySelector("[data-type='value']");
    this.$arrow = this.$el.querySelector("[data-type='arrow']")


    this.select(this.selectedId);
  }

  #setup() {
    this.$el.addEventListener("click", this.clickHandler.bind(this));
  }

  clickHandler(event) {
    const {type} = event.target.dataset;

    if ((type === "input") || (type === "arrow")) {
      this.toggle();
    } else if (type === "item") {
      this.select(event.target.dataset.id);
    } else if (type === "backdrop") {
      this.close();
    }
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select = (id) => {
    if (!id) {
      return;
    }

    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el.querySelectorAll(`[data-type="item"]`).forEach(item => item.classList.remove("selected"));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected")

    this.options.onSelect && this.options.onSelect(this.current);

    this.close();
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}
