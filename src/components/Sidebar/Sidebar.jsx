import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './Sidebar.css';

const FilterSection = ({ 
  title, 
  section, 
  options, 
  openSections, 
  activeFilters, 
  toggleSection, 
  toggleFilter 
}) => {
  const isOpen = openSections[section];
  const activeCount = activeFilters[section]?.length || 0;

  return (
    <div className="filter-section">
      <div className="filter-header" onClick={() => toggleSection(section)}>
        <span>
          {title}
          {activeCount > 0 && (
            <span className="filter-count">{activeCount}</span>
          )}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && (
        <ul className="filter-options">
          {options.map((opt, i) => {
            const isChecked = activeFilters[section]?.includes(opt);
            return (
              <li key={i}>
                <label className={`checkbox-container ${isChecked ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilter(section, opt)}
                  />
                  <span className="checkmark"></span>
                  {opt}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const Sidebar = () => {
  const { activeFilters, toggleFilter, clearFilters } = useStore();

  const [openSections, setOpenSections] = React.useState({
    objetivo: true,
    sabor: true,
    tamanho: false,
    preco: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const totalActive = Object.values(activeFilters).flat().length;

  const sectionProps = {
    openSections,
    activeFilters,
    toggleSection,
    toggleFilter
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header-row">
        <div className="sidebar-title">FILTRAR POR</div>
        {totalActive > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            <X size={14} /> Limpar ({totalActive})
          </button>
        )}
      </div>

      <FilterSection
        title="CATEGORIA"
        section="categoria"
        options={['Whey Protein', 'Creatina', 'Aminoácidos', 'Pré-Treino', 'Vitaminas', 'Hipercalóricos', 'Veganos']}
        {...sectionProps}
      />

      <FilterSection
        title="OBJETIVO"
        section="objetivo"
        options={['Massa Muscular', 'Emagrecimento', 'Energia', 'Saúde & Bem Estar', 'Recuperação Muscular']}
        {...sectionProps}
      />

      <FilterSection
        title="SABOR"
        section="sabor"
        options={['Baunilha', 'Chocolate', 'Morango', 'Cookies & Cream', 'Frutas Vermelhas', 'Natural']}
        {...sectionProps}
      />

      <FilterSection
        title="FAIXA DE PREÇO"
        section="preco"
        options={['Até R$ 100', 'R$ 100 a R$ 200', 'Acima de R$ 200']}
        {...sectionProps}
      />

      <FilterSection
        title="TAMANHO"
        section="tamanho"
        options={['250g', '500g', '1kg', '2kg']}
        {...sectionProps}
      />
    </aside>
  );
};

export default Sidebar;


