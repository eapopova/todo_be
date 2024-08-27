import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
  tableName: 'tasks',
})
export class Todo extends Model{
    @Column({ allowNull: false })
      text: string;

    @Column({ defaultValue: false })
      isComplted: boolean;
}