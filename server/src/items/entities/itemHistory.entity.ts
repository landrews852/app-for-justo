// import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

// // action para diferenciar si el artículo se está entregando o retirando
// // enum action {
// //   in = 'Ingreso',
// //   out = 'Retiro',
// // }

// // ownerType para diferenciar si el ingreso/retiro se realiza a un empleado o bodega
// // enum ownerType {
// //   store = 'Bodega',
// //   employee = 'Empleado',
// // }

// // ItemHistory registra el historial para cada movimiento de cada artículo
// @ObjectType()
// export class ItemHistory {
//   @Field(() => ID)
//   _id: string;

//   @Field()
//   relationId: string;

//   @Field()
//   holderType: 'Bodega' | 'Empleado';

//   @Field()
//   action: 'in' | 'out';

//   // @Field()
//   // date: Date;
// }
