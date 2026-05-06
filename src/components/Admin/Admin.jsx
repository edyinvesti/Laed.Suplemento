import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, Plus, Trash2, Camera } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const { products, addProduct, deleteProduct } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    categoria: 'Whey Protein',
    objetivo: '',
    marca: '',
    tamanho: '',
    sabor: '',
    image: null,
    imagePreview: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      discount: formData.discount ? parseInt(formData.discount, 10) : null,
      categoria: formData.categoria,
      objetivo: formData.objetivo,
      marca: formData.marca,
      sabor: formData.sabor,
      tamanho: formData.tamanho,
      image: formData.image || '/laed-cyber-bottles.png', // fallback image
      rating: 5,
      reviews: 0,
    };

    addProduct(newProduct);
    setIsAdding(false);
    setFormData({
      name: '', price: '', originalPrice: '', discount: '', 
      categoria: 'Whey Protein', objetivo: '', marca: '', tamanho: '', sabor: '', 
      image: null, imagePreview: null
    });
  };

  return (
    <div className="admin-dashboard container">
      <div className="admin-header">
        <h1>Painel de Administração</h1>
        <button className="btn-add-product" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={20} /> {isAdding ? 'Voltar para Lista' : 'Adicionar Produto'}
        </button>
      </div>

      {isAdding ? (
        <div className="admin-card add-product-card">
          <h2>Novo Produto</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-row image-upload-row">
              <label className="image-upload-label">
                {formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={40} />
                    <span>Clique para enviar foto</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>
            </div>

            <div className="form-group">
              <label>Nome do Produto *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preço Atual (R$) *</label>
                <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Preço Antigo (Opcional)</label>
                <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Desconto % (Opcional)</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoria</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                  <option value="Whey Protein">Whey Protein</option>
                  <option value="Creatina">Creatina</option>
                  <option value="Vitaminas">Vitaminas</option>
                  <option value="Aminoácidos">Aminoácidos</option>
                  <option value="Acessórios">Acessórios</option>
                </select>
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Sabor</label>
                <input type="text" name="sabor" value={formData.sabor} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Objetivo</label>
                <input type="text" name="objetivo" value={formData.objetivo} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                 <label>Tamanho/Volume (ex: 2kg, 60 Caps)</label>
                 <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Salvar Produto</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-card">
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} className="table-img" />
                    </td>
                    <td>
                      <div className="table-product-name">{product.name}</div>
                      <div className="table-product-brand">{product.marca}</div>
                    </td>
                    <td>R$ {product.price.toFixed(2).replace('.', ',')}</td>
                    <td><span className="table-badge">{product.categoria}</span></td>
                    <td>
                      <button className="btn-delete" onClick={() => deleteProduct(product.id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;


