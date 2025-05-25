// api/controllers/product.js
import { api } from '..'

export const productController = props => {
  const baseRoute = 'products'
  const description = 'สินค้า'

  const config = {
    ...props,
    description
  }

  return {
    create: async body => {
      return await api.post(`${baseRoute}`, body, config)
    },

    update: async ({ id, ...formData }) => {
      return await api.patch(`${baseRoute}/${id}`, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },

    updateImage: async (id, imageFile) => {
      const formData = new FormData()
      formData.append('image', imageFile)
      return await api.patch(`${baseRoute}/${id}`, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },

    delete: async id => {
      return await api.delete(`${baseRoute}/${id}`, config)
    },

    findAll: async () => {
      return await api.get(`${baseRoute}`, config)
    }
  }
}
