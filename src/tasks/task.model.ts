import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
  tableName: 'tasks',
})

export class Task extends Model{
    @Column({ allowNull: false })
      text: string;

    @Column({ defaultValue: false })
      isCompleted: boolean;
}