import ConexionMongo from './coneccionMongoDb.js';

class UsuarioMongoDb {
    constructor() {
        this.usuariosCollection = null;
        this.init();
    }

    async init() {
        try {
            const conexionMongo = new ConexionMongo();
            this.usuariosCollection = await conexionMongo.connectToMongoDB();
        } catch (error) {
            console.error(error);
        }
    }

    async registro(email, nombre, pass,apellido,fechaNac,dni,saldo) {
        try {
            // Verificar si el correo electrónico ya existe en la base de datos
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (existingUser) {
                throw new Error(`Error, el correo ${email} ya fue ingresado`);
            }
            
            if (!email || !nombre || !pass) {
                throw new Error('El email, nombre y pass son campos requeridos');
              }
            // Insertar el nuevo usuario en la colección
            const newUser = {
                email: email,
                nombre: nombre,
                apellido:apellido,
                fechaNac:fechaNac,
                dni:dni,
                saldo:saldo,
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
            // Verificar si el correo electrónico está registrado en la base de datos
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
            // Actualizar el campo "registro" del usuario a 1 (confirmado)
            await this.usuariosCollection.updateOne({ email: email }, { $set: { registro: true } });

            return;
        } catch (error) {
            console.log(error);
            throw new Error("Error en la confirmación");
        }
    }


    async editarUsuario(email, nombre, apellido, saldo) {
        try {
          // Actualizar los campos "nombre", "apellido" y "saldo" del usuario
          await this.usuariosCollection.updateOne({ email: email }, { $set: { nombre: nombre, apellido: apellido, saldo: saldo } });
      
          // Obtener el usuario actualizado
          const user = await this.usuariosCollection.findOne({ email: email });
      
          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Error al editar al usuario: " + error.message);
        }
      }
      

    async cambiarContrasenia(email, nuevaPass) {
        try {
            // Verificar si el correo electrónico existe en la base de datos
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (!existingUser) {
                throw new Error("El correo " + email + " no está registrado");
            }

            // Actualizar la contraseña del usuario
            await this.usuariosCollection.updateOne({ email: email }, { $set: { pass: nuevaPass } });

            return;
        } catch (error) {
            throw new Error(error);
        }
    }

}


export default UsuarioMongoDb;

