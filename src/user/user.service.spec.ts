import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { Model } from 'mongoose';
// import { getModelToken } from '@nestjs/mongoose';
// import { User } from './schema/users.schema';

// describe('UserService', () => {
//   let service: UserService;
//   let model : Model<User>

//   const mockBlogData = {
//     _id:'1',
//     firstname: 'unit test firstname',
//     lastname: 'unit test lastname',
//     phone: '0840931102',
//     username: 'unittest@gmail.com',
//     password: '123123',
//     createDate: new Date(),
//   }

//   const mockBlogDataModel = {
//     create:jest.fn().mockResolvedValue(mockBlogData),
//     find:jest.fn().mockResolvedValue([mockBlogData]),
//     findById: jest.fn().mockResolvedValue(mockBlogData),
//     findByIdAndUpdate: jest.fn().mockResolvedValue(mockBlogData),
//     findByIdAndDelete: jest.fn().mockResolvedValue(mockBlogData),
//   }

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     model = module.get<Model<User>>(getModelToken('User'))
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   // describe('create',()=>{
//   //   it('should create a new user', async ()=>{
//   //     const newBloger = await service.createUsers({
//   //       firstname:'firstname unit test',
//   //       lastname:"list unit",
//   //       phone:"9999999999",
//   //       username:"unittest@gmail.com",
//   //       password:"123123"
//   //     })
//   //     expect(newBloger).toEqual(expect.objectContaining(mockBlogData));
//   //     expect(model.create).toHaveBeenCalledWith({
//   //       firstname:'firstname unit test',
//   //       lastname:"list unit",
//   //       phone:"9999999999",
//   //       username:"unittest@gmail.com",
//   //       password:"123123"
//   //     })
//   //   })
//   // })
// });

