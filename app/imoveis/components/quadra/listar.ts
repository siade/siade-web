
class QuadraListarCtrl {
    static $inject = ["$scope", "$state", "$mdDialog", "QuadraDao", "BairroDao"]
    quadras; bairros; bairro; bairroSel;

    constructor(protected $scope, protected $state, protected $mdDialog,
                protected QuadraDao, protected BairroDao) {
        this.bairroSel = this.bairro
        $scope.bairrosPromise = BairroDao
            .buscarTodos().then(r => {this.bairros = r})
        this.buscarQuadras()
    }

    buscarQuadras() {
        this.$scope.quadrasPromise = this.QuadraDao
            .buscarPeloBairro(this.bairro).then(r => this.quadras = r)
    }

    mudarBairro() {
        if(this.bairroSel.id != this.bairro.id) {
            this.$state.go('quadra.listar',
                {bairroId: this.bairroSel.id},
                {notify:false, location: 'replace'})
            this.bairro = this.bairroSel
            this.buscarQuadras()
        }
    }

    excluirQuadra(ev, quadra) {
        let confirm = this.$mdDialog.confirm()
          .title("Excluir quadra")
          .textContent("Deseja realmente a quadra "+
              quadra.numero+
              "? Esta ação não pode ser desfeita.")
          .targetEvent(ev)
          .ok("Excluir quadra")
          .cancel('Cancelar')
        this.$mdDialog.show(confirm).then(() => {
            let index = this.quadras.indexOf(quadra)
            this.quadras.splice(index, 1)
            console.log('excluir quadra', index)
        })
    }
}

export const cpQuadraListar:ng.IComponentOptions = {
    bindings: {"bairro": "<"},
    controller: QuadraListarCtrl,
    controllerAs: "$ctrl",
    templateUrl: "imoveis/components/quadra/listar.tpl.html"
}