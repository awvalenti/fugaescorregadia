package com.github.awvalenti.fugaescorregadia;

import com.github.awvalenti.fugaescorregadia.componentes.FuncionalJava8;
import com.github.awvalenti.fugaescorregadia.nucleo.OperacoesFuncionais;
import com.google.inject.Binder;
import com.google.inject.Module;

public enum InjetorParaTestes implements Module {
	INSTANCIA;

	@Override
	public void configure(Binder b) {
		b.bind(OperacoesFuncionais.class).to(FuncionalJava8.class);
	}

}
