import ConexionMongo from './conexionMongoDb.js';

class UsuarioMongoDb {
    constructor() {
        this.usuariosCollection = null;
        this.init();
    }

    async init() {
        try {
            const conexionMongo = new ConexionMongo();
            await conexionMongo.connectToMongoDB();
            this.usuariosCollection = await conexionMongo.usuariosColeccion()
        } catch (error) {
            console.error(error);
        }
    }

    async registro(email, nombre, pass,apellido,fechaNac,dni) {
        try {
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (existingUser) {
                throw new Error(`Error, el correo ${email} ya fue ingresado`);
            }
            
            if (!email || !nombre || !pass) {
                throw new Error('El email, nombre y pass son campos requeridos');
              }
            const newUser = {
                email: email,
                nombre: nombre,
                apellido:apellido,
                fechaNac:fechaNac,
                dni:dni,
                pass: pass,
                registro: false
            };
            await this.usuariosCollection.insertOne(newUser);

            return "Usuario registrado correctamente";
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error);
        }
    }


    async login(email) {
        try {
         
            const user = await this.usuariosCollection.findOne({ email: email });
            if (!user) {
                throw new Error(`El ${email} no está registrado`);
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async confirmarRegistro(email) {
        try {
           
            await this.usuariosCollection.updateOne({ email: email }, { $set: { registro: true } });

            return;
        } catch (error) {
            console.log(error);
            throw new Error("Error en la confirmación");
        }
    }


    async editarUsuario(email, nombre, apellido) {
        try {
         
          await this.usuariosCollection.updateOne({ email: email }, { $set: { nombre: nombre, apellido: apellido, } });
      
        
          const user = await this.usuariosCollection.findOne({ email: email });
      
          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Error al editar al usuario: " + error.message);
        }
      }
      

    async cambiarContrasenia(email, nuevaPass) {
        try {
           
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (!existingUser) {
                throw new Error("El correo " + email + " no está registrado");
            }

            
            await this.usuariosCollection.updateOne({ email: email }, { $set: { pass: nuevaPass } });

            return;
        } catch (error) {
            throw new Error(error);
        }
    }


    async eliminarCuenta(email){
        try {
          const usuario = await this.usuariosCollection.findOne({ email }); 
      
          if (usuario) {
            await this.usuariosCollection.deleteOne({ email }); 
            console.log(`La cuenta con el email ${email} ha sido borrada correctamente`);
          } else {
            throw new Error("Usuario no encontrado");
          }
        } catch (error) {
          throw new Error(error);
        }
      };
      




}


export default UsuarioMongoDb;

